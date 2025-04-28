import pandas as pd
import os

# Define the path to the Excel file and the output JSON file
excel_file_path = '/Users/jonathan/Documents/PMAH/cave de camley.xlsx'
json_file_path = '/Users/jonathan/Documents/PMAH/jh112323.github.io/src/data/wines.json'

def convert_excel_to_json(excel_path, json_path):
    # Load the Excel file
    df = pd.read_excel(excel_path)

    # Convert DataFrame to JSON
    json_data = df.to_json(orient='records', indent=4)

    # Save JSON data to a file
    with open(json_path, 'w') as json_file:
        json_file.write(json_data)

    print(f"Converted {excel_path} to {json_path}")

if __name__ == "__main__":
    convert_excel_to_json(excel_file_path, json_file_path)