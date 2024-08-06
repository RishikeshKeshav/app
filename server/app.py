from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
# load_dotenv()
load_dotenv()

df = pd.read_csv('https://raw.githubusercontent.com/peck/engineering-assessment/main/Mobile_Food_Facility_Permit.csv')
data = df.to_dict(orient='records')
# df = pd.read_csv('Mobile_Food_Facility_Permit.csv')
# data = df.to_dict(orient='records')
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)



model = genai.GenerativeModel('gemini-1.5-flash', system_instruction="Extract food related keywords from the prompt. Return only the keywords as a json object, with no special formatting or anything else. The list should be accessible by the keyword \"food\"")

@app.route('/get_data', methods=['POST'])
def get_data():
    req_data = request.get_json()
    user_zip = req_data.get('zip_code')
    prompt = req_data.get('prompt')

    generated_text = json.loads(model.generate_content(prompt).text)
    generated_text = generated_text["food"]
   
    keywords = [word for word in generated_text if word.strip().isalpha()]
    # print(keywords)

    
    res = [item for item in data if item.get('Zip Codes') == user_zip]
    food_items = []
    applicant_names = []
    address_names = []

    
    for kw in keywords:
        for item in res:
            food_item = item.get("FoodItems")

            if isinstance(food_item, str) and food_item.find(kw):
                applicant_name = item.get("Applicant")
                address_name = item.get("Address")
                # print(address_name, type(address_name))
                if isinstance(food_item, str) and kw.lower() in food_item.lower():
                    food_items.append(food_item)
                if isinstance(applicant_name, str) and kw.lower() in applicant_name.lower():
                    applicant_names.append(applicant_name)
                if isinstance(address_name, str):
                    address_names.append(address_name)
            

    
    result = {
        "food_items": food_items,
        "applicant_names": applicant_names,
        "address_names": address_names,
        "generated_text": generated_text
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True,port=5001)
