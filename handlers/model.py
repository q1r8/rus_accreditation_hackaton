import math


import torch
import torch.nn as nn
import torch.nn.functional as F


class CFG:
    DistilBERT = True  # if set to False, BERT model will be used
    bert_hidden_size = 768

    batch_size = 64
    epochs = 30
    num_workers = 4
    learning_rate = 1e-5  # 3e-5
    scheduler = "ReduceLROnPlateau"
    step = 'epoch'
    patience = 2
    factor = 0.8
    dropout = 0.5
    model_path = "/kaggle/working"
    max_length = 30
    model_save_name = "model.pt"
    device = torch.device("cuda" if torch.cuda.is_available() else 'cpu')


class TextDataset(torch.utils.data.Dataset):
    def __init__(self, dataframe, tokenizer, mode="train", max_length=None):
        self.dataframe = dataframe
        if mode != "test":
            self.targets = dataframe['label_code'].values
        texts = list(dataframe['Общее наименование продукции'].apply(lambda o: str(o)).values)
        self.encodings = tokenizer(texts,
                                   padding=True,
                                   truncation=True,
                                   max_length=max_length)
        self.mode = mode

    def __getitem__(self, idx):
        # putting each tensor in front of the corresponding key from the tokenizer
        # HuggingFace tokenizers give you whatever you need to feed to the corresponding model
        item = {key: torch.tensor(values[idx]) for key, values in self.encodings.items()}
        # when testing, there are no targets so we won't do the following
        if self.mode != "test":
            item['labels'] = torch.tensor(self.targets[idx]).long()
        return item

    def __len__(self):
        return len(self.dataframe)


class ArcMarginProduct(nn.Module):
    r"""Implement of large margin arc distance: :
        Args:
            in_features: size of each input sample
            out_features: size of each output sample
            s: norm of input feature
            m: margin
            cos(theta + m)
        """
    def __init__(self, in_features, out_features, s=30.0, m=0.50, easy_margin=False):
        super(ArcMarginProduct, self).__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.s = s
        self.m = m
        self.weight = nn.Parameter(torch.FloatTensor(out_features, in_features))
        nn.init.xavier_uniform_(self.weight)

        self.easy_margin = easy_margin
        self.cos_m = math.cos(m)
        self.sin_m = math.sin(m)
        self.th = math.cos(math.pi - m)
        self.mm = math.sin(math.pi - m) * m

    def forward(self, input, label):
        # --------------------------- cos(theta) & phi(theta) ---------------------------
        cosine = F.linear(F.normalize(input), F.normalize(self.weight))
        sine = torch.sqrt((1.0 - torch.pow(cosine, 2)).clamp(0, 1))
        phi = cosine * self.cos_m - sine * self.sin_m
        if self.easy_margin:
            phi = torch.where(cosine > 0, phi, cosine)
        else:
            phi = torch.where(cosine > self.th, phi, cosine - self.mm)
        # --------------------------- convert label to one-hot ---------------------------
        # one_hot = torch.zeros(cosine.size(), requires_grad=True, device='cuda')
        one_hot = torch.zeros(cosine.size(), device=CFG.device)
        one_hot.scatter_(1, label.view(-1, 1).long(), 1)
        # -------------torch.where(out_i = {x_i if condition_i else y_i) -------------
        output = (one_hot * phi) + ((1.0 - one_hot) * cosine)  # you can use torch.where if your torch.__version__ is 0.4
        output *= self.s
        # print(output)

        return output


class Model(nn.Module):
    def __init__(self,
                 bert_model,
                 num_classes=None,
                 last_hidden_size=CFG.bert_hidden_size):
        super().__init__()
        self.bert_model = bert_model
        self.arc_margin = ArcMarginProduct(last_hidden_size,
                                           num_classes,
                                           s=30.0,
                                           m=0.50,
                                           easy_margin=False)

    def get_bert_features(self, batch):
        output = self.bert_model(input_ids=batch['input_ids'], attention_mask=batch['attention_mask'])
        last_hidden_state = output.last_hidden_state  # shape: (batch_size, seq_length, bert_hidden_dim)
        CLS_token_state = last_hidden_state[:, 0, :]  # obtaining CLS token state which is the first token.
        return CLS_token_state

    def forward(self, batch):
        CLS_hidden_state = self.get_bert_features(batch)
        # output = self.arc_margin(CLS_hidden_state, batch['labels'])
        return CLS_hidden_state


class AvgMeter:
    def __init__(self, name="Metric"):
        self.name = name
        self.reset()

    def reset(self):
        self.avg, self.sum, self.count = [0] * 3

    def update(self, val, count=1):
        self.count += count
        self.sum += val * count
        self.avg = self.sum / self.count

    def __repr__(self):
        text = f"{self.name}: {self.avg:.4f}"
        return text






