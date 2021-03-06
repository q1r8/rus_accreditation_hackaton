from flask import Flask, render_template, request, flash, make_response, jsonify
import json
from flask_cors import CORS, cross_origin
import torch
from transformers import DistilBertTokenizer, DistilBertModel
import pandas as pd
import numpy as np

from tqdm import tqdm

from handlers.model import ArcMarginProduct, Model, CFG, TextDataset


app = Flask(__name__, template_folder='template')
CORS(app, support_credentials=True)
app.config['SECRET_KEY'] = '1231K3M21EDK12K'
app.config['CORS_HEADERS'] = 'Content-Type'

model_name='cahya/distilbert-base-indonesian'
tokenizer = DistilBertTokenizer.from_pretrained(model_name)
bert_model = DistilBertModel.from_pretrained(model_name)
# lbl_encoder = LabelEncoder()

base_file = pd.read_csv('models/df_with_embs.csv')
categories_matching = pd.read_csv('categories_code_namings.csv')

model = Model(bert_model, num_classes=base_file.shape[1])
model.load_state_dict(torch.load('./models/model.pt', map_location=torch.device('cpu')))
model.cpu()


def get_predicts(model, dataloader):
    tqdm_object = tqdm(dataloader, total=len(dataloader))
    preds = []
    for batch in tqdm_object:
        batch = {k: v.cuda() for k, v in batch.items()}
        preds.append(model(batch))
    return preds


@app.route('/model_inference', methods=['POST', 'GET', 'OPTIONS'])
def get_model_response():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_prelight_response()
    elif request.method == 'POST':
        print(request.json)
        # render_template('index.html')
        response_df = pd.DataFrame([{'Общее наименование продукции':request.json['description']}])
        dataset = TextDataset(response_df.iloc[0:1, :], tokenizer, max_length=CFG.max_length, mode='test')
        dataloader = torch.utils.data.DataLoader(dataset,
                                                 batch_size=1,
                                                 num_workers=CFG.num_workers,
                                                 shuffle=True)
        tqdm_object = tqdm(dataloader, total=len(dataloader))
        preds = []
        model.cpu()
        model.eval()
        for batch in tqdm_object:
            with torch.no_grad():
                batch = {k: v.cpu() for k, v in batch.items()}
                preds.append(model(batch))

        dists = np.sum((np.square(preds[0][0].cpu().detach().numpy() - base_file.values.T)), axis=1)
        indices = np.argsort(dists)
        predict_category = str(int(base_file.columns[indices[0]]) / 100)
        print(predict_category)
        category_name = categories_matching[categories_matching\
                        ['Раздел ЕП РФ (Код из ФГИС ФСА для подкатегории продукции)'] == predict_category]\
                        ['Подкатегория продукции'][0]
        model_response = {'model_response_category_code':predict_category,\
                          'model_response_category_name':category_name,
                          'success': 'ok'}
    return _corsify_actual_response(jsonify(model_response))
    # return render_template('index.html')


def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/")
def index():
    return render_template('index.html')


if __name__ == '__main__':
   app.run(host='0.0.0.0', port=5000, debug=True)
