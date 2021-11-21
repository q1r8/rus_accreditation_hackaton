import aiohttp
import asyncio
import json

# import pandas as pd


async def main():

    df = pd.read_csv('test_push_to_stage.csv')
    async with aiohttp.ClientSession() as session:
        headers_dict = {"api-key": "uRAs3xYrpaXz09T6JSBtWKvgme6gy39RRSnBzlWmIR1Ol5Or9nXZ5XJB86hdha77",
                        "X-UID": "222330",
                        # "X-UID": "222290",
                        "x-token": "n8qVqBhIEordvHW",
                        # "x-token": "V8CsYakLbKHS9Pl",
                        "Content-Type": 'application/json',
                        "X-Client": "bristol",
                        'Client': 'bristol'}

        tasks = [
            asyncio.ensure_future(session.put(
                url='https://stage.kb-monita.ru/api-task-manager/staging/task',
                headers=headers_dict,
                data=json.dumps({"image_url": url, "type": "retail", "group_id": "legacy", "user_id": "1:bristol"})
            ))
            for url in df.image_url
        ]
        res = []
        for i in await asyncio.gather(*tasks):
            res.append(i)

        return res

loop = asyncio.get_event_loop()
print(loop.run_until_complete(main()))
