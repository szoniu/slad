import pandas as pd
from translate import Translator

# Load the Excel file
file_path = 'E:/dev/slad/xls/ghg2023update.xlsx'

# Load the second sheet
df = pd.read_excel(file_path, sheet_name=1)

# Initialize the translator
translator = Translator(to_lang="pl")


# Function to translate a column
def translate_column(df, column_name):
    translated_column = []
    for item in df[column_name]:
        if pd.notnull(item):
            try:
                translated_text = translator.translate(item)
                translated_column.append(translated_text)
            except Exception as e:
                print(f"Error translating {item}: {e}")
                translated_column.append(item)
        else:
            translated_column.append(item)
    return translated_column


# Identify the columns to translate
columns_to_translate = ['Scope', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Column Text', 'UOM', 'GHG/Unit']

# Translate the columns
for column in columns_to_translate:
    if column in df.columns:
        df[column] = translate_column(df, column)

# Save the translated DataFrame to a new Excel file
translated_file_path = 'E:/dev/slad/xls/ghg2023update_translated.xlsx'
df.to_excel(translated_file_path, index=False)

print(f'Translated file saved to: {translated_file_path}')
