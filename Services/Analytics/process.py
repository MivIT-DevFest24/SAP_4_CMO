from fastapi import FastAPI, Request
import logging
import pandas as pd

from Services.Analytics import analyse

logging.basicConfig(level=logging.INFO)

app = FastAPI()

data_df = pd.DataFrame()

@app.post("/process-data/")
async def process_data(request: Request):
    global data_df
    data = await request.json()  # Parse incoming data
    logging.info(f"Received data for analysis: {data}")
    
    # df
    new_data = pd.DataFrame([data])
    data_df = pd.concat([data_df, new_data], ignore_index=True)
    
    logging.info(f"Data stored for analysis. Current data count: {len(data_df)} rows")
    analysis_result = analyse(data, json_parser, model)
    

    return {"status": "Data processed successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
