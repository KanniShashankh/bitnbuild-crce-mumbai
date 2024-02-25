
from flask import Flask, render_template, request
app = Flask(__name__)
from flask_cors import CORS, cross_origin

CORS(app)
# gcloud auth print-access-token
TOKEN = 'ya29.a0AfB_byD5Kvz4OVtvNHeAhoO1iAfvibp8Yr5Z42O9tdnAXXSIUqhFMM4fCeNoqSn8NjGNvzGiy1zs4MuYItirZ-_nAUohxgUa7CmEqJ9AQqVGBxW8n7TWW6KgDd58qQxzASu3aJRZT8Uj_lZEWAEb7D_xiTrSR2neANZGGwf3tAwaCgYKAboSARASFQHGX2MiT3gBm-fCu5li9UtZoRMPdg0178'
@app.route("/")
def main():
    return "Welcome!"

@app.route('/how are you')
def hello():
    return 'I am good, how about you?'

@app.route('/upload', methods=['POST'])
def upload():
    try:
        print(request)
        file = request.files['file']
        print(file)
        # file.save(file_path)
        data = process_document_sample(
               project_id="951555931380",
                location="us",
                processor_id="c39f0f36a0c7e879",
                file_path="/Users/shashankhkanni/Downloads/cmatrix-gdsc.pdf",
                mime_type = "application/pdf",
                file_data = file.read(),
                binary_file = True
        )
        print(data)
        return data
        return 'wow works'
    except Exception as e:
        print(e)
        return str(e)
    
@app.route('/query', methods=['POST'])
def query():
    try:
        # Get the text from the POST request
        import json

        data = json.loads(request.get_data())
        text = data.get('text') 


        data = process_company_data(
            file_path = text,
        )

        print(data)
        return data

    except Exception as e:
        print(e)
        return str(e)


# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# [START documentai_process_document]
# [START documentai_process_document_processor_version]
from typing import Optional

from google.api_core.client_options import ClientOptions
from google.cloud import documentai  # type: ignore

# TODO(developer): Uncomment these variables before running the sample.
# project_id = "YOUR_PROJECT_ID"
# location = "YOUR_PROCESSOR_LOCATION" # Format is "us" or "eu"
# processor_id = "YOUR_PROCESSOR_ID" # Create processor before running sample
# file_path = "/path/to/local/pdf"
 # Refer to https://cloud.google.com/document-ai/docs/file-types for supported file types
# field_mask = "text,entities,pages.pageNumber"  # Optional. The fields to return in the Document object.
# processor_version_id = "YOUR_PROCESSOR_VERSION_ID" # Optional. Processor version to use
project_id = "951555931380"
location = "us-central1"

def process_document_sample(
    project_id: str,
    location: str,
    processor_id: str,
    file_path: str,
    mime_type: str,
    file_data: Optional[bytes] = None,
    field_mask: Optional[str] = None,
    processor_version_id: Optional[str] = None,
    binary_file: Optional[bool] = False,
) -> None:
    # You must set the `api_endpoint` if you use a location other than "us".
    opts = ClientOptions(api_endpoint=f"{location}-documentai.googleapis.com")

    client = documentai.DocumentProcessorServiceClient(client_options=opts)

    if processor_version_id:
        # The full resource name of the processor version, e.g.:
        # `projects/{project_id}/locations/{location}/processors/{processor_id}/processorVersions/{processor_version_id}`
        name = client.processor_version_path(
            project_id, location, processor_id, processor_version_id
        )
    else:
        # The full resource name of the processor, e.g.:
        # `projects/{project_id}/locations/{location}/processors/{processor_id}`
        name = client.processor_path(project_id, location, processor_id)

    # Read the file into memory
    if not binary_file:
        with open(file_path, "rb") as image:
            image_content = image.read()
    else:
        image_content = file_data
    # Load binary data
    raw_document = documentai.RawDocument(content=image_content, mime_type=mime_type)

    # For more information: https://cloud.google.com/document-ai/docs/reference/rest/v1/ProcessOptions
    # Optional: Additional configurations for processing.
    # process_options = documentai.ProcessOptions(
    #     # Process only specific pages
    #     individual_page_selector=documentai.ProcessOptions.IndividualPageSelector(
    #         pages=[1]
    #     )
    # )

    # Configure the process request
    request = documentai.ProcessRequest(
        name=name,
        raw_document=raw_document,
        field_mask=field_mask,
        # process_options=process_options,
    )

    result = client.process_document(request=request)

    # For a full list of `Document` object attributes, reference this page:
    # https://cloud.google.com/document-ai/docs/reference/rest/v1/Document
    document = result.document

    document.text = document.text.replace("\n", " ")
    import re
    document.text = re.sub(r'[^a-zA-Z0-9\s]', '', document.text)

    
  
    prompt = "Hello. Summarize the following text for me. And explaining the key points of the text, Produce the output in markdown fashion so that i can be directly put into a markdown viewer for clear viewing with bullet points. -> " + document.text
    # prompt = "write a poem in nicely spaced format with cute emojis"
    import requests
    import json
    url = "https://us-central1-aiplatform.googleapis.com/v1/projects/quick-yen-415315/locations/us-central1/publishers/google/models/gemini-1.0-pro-vision:streamGenerateContent"

    payload = "{\n  \"contents\": {\n    \"role\": \"user\",\n    \"parts\": {\n        \"text\": \"" + prompt + "\"\n    },\n  },\n  \"safety_settings\": {\n    \"category\": \"HARM_CATEGORY_SEXUALLY_EXPLICIT\",\n    \"threshold\": \"BLOCK_LOW_AND_ABOVE\"\n  },\n  \"generation_config\": {\n    \"temperature\": 0.2,\n    \"topP\": 0.8,\n    \"topK\": 40\n  }\n}"
    print(payload)
    print()
    print("lol")
    print("{\n  \"contents\": {\n    \"role\": \"user\",\n    \"parts\": {\n        \"text\": \"Give me a recipe for banana bread.\"\n    },\n  },\n  \"safety_settings\": {\n    \"category\": \"HARM_CATEGORY_SEXUALLY_EXPLICIT\",\n    \"threshold\": \"BLOCK_LOW_AND_ABOVE\"\n  },\n  \"generation_config\": {\n    \"temperature\": 0.2,\n    \"topP\": 0.8,\n    \"topK\": 40\n  }\n}")
    #CHANGE HERE  $(gcloud auth print-access-token) 
    headers = {
    'Authorization': 'Bearer ' + TOKEN,
    'Content-Type': 'application/json; charset=utf-8'
    }
    print("WOWOWOWOWO")


    response = requests.request("POST", url, headers=headers, data=payload)
    response_json = json.loads(response.text)
    print(response_json)
    l = []
    for i in response_json:
        try:
            # print(i['candidates'][0]['content']['parts'][0]['text'])
            l.append(i['candidates'][0]['content']['parts'][0]['text'])
        except:
            pass
    # print("here", l)
    return "".join(l)

    #file upload data
    # Assuming 'binary_content' is the binary data of the file content
    # file = {'file': ('filename', binary_content)}

    response = requests.request("POST", url, headers=headers, files=file)

    # print(response.text)
    # final = ""
    response_json = json.loads(response.text)
    # Use response_json as a JSON object
    # For example:
    l = []
    for i in response_json:
        # print(i['candidates'])
        l.append(i['candidates'][0]['content']['parts'][0]['text'])
    return "".join(l)


    # Read the text recognition output from the processor
    print("The document contains the following text:")
    # print(document.text)


# [END documentai_process_document_processor_version]
# [END documentai_process_document]
        
def process_company_data(
    file_path: str,
) -> None:
    # You must set the `api_endpoint` if you use a location other than "us".
    prompt = file_path
    # prompt = "write a poem in nicely spaced format with cute emojis"
    import requests
    import json
    url = "https://us-central1-aiplatform.googleapis.com/v1/projects/quick-yen-415315/locations/us-central1/publishers/google/models/gemini-1.0-pro-vision:streamGenerateContent"

    payload = "{\n  \"contents\": {\n    \"role\": \"user\",\n    \"parts\": {\n        \"text\": \"" + prompt + "\"\n    },\n  },\n  \"safety_settings\": {\n    \"category\": \"HARM_CATEGORY_SEXUALLY_EXPLICIT\",\n    \"threshold\": \"BLOCK_LOW_AND_ABOVE\"\n  },\n  \"generation_config\": {\n    \"temperature\": 0.2,\n    \"topP\": 0.8,\n    \"topK\": 40\n  }\n}"
    print(payload)
    print()
    print("lol")
    print("{\n  \"contents\": {\n    \"role\": \"user\",\n    \"parts\": {\n        \"text\": \"Give me a recipe for banana bread.\"\n    },\n  },\n  \"safety_settings\": {\n    \"category\": \"HARM_CATEGORY_SEXUALLY_EXPLICIT\",\n    \"threshold\": \"BLOCK_LOW_AND_ABOVE\"\n  },\n  \"generation_config\": {\n    \"temperature\": 0.2,\n    \"topP\": 0.8,\n    \"topK\": 40\n  }\n}")
    #CHANGE HERE  $(gcloud auth print-access-token) 
    headers = {
    'Authorization': 'Bearer ' + TOKEN,
    'Content-Type': 'application/json; charset=utf-8'
    }
    print("WOWOWOWOW2O22")


    response = requests.request("POST", url, headers=headers, data=payload)
    response_json = json.loads(response.text)
    print(response_json)
    l = []
    for i in response_json:
        # print(i['candidates'])
        l.append(i['candidates'][0]['content']['parts'][0]['text'])
    return "".join(l)

    #file upload data
    # Assuming 'binary_content' is the binary data of the file content
    # file = {'file': ('filename', binary_content)}

    response = requests.request("POST", url, headers=headers, files=file)

    # print(response.text)
    # final = ""
    response_json = json.loads(response.text)
    # Use response_json as a JSON object
    # For example:
    l = []
    for i in response_json:
        # print(i['candidates'])
        l.append(i['candidates'][0]['content']['parts'][0]['text'])
    return "".join(l)


    # Read the text recognition output from the processor
    print("The document contains the following text:")
    # print(document.text)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
