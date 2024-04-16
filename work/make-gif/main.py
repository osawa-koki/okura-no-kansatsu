import os
import uuid
from dotenv import load_dotenv
import boto3

from PIL import Image, ImageDraw

load_dotenv()

file_name = f'./tmp/{uuid.uuid4()}.png'

BUCKET_NAME = os.getenv('BUCKET_NAME')

# ファイル一覧を取得
s3 = boto3.client('s3')

response = s3.list_objects_v2(
    Bucket=BUCKET_NAME,
    Prefix=''
)

images = []
for content in response['Contents']:
    key = content['Key']
    # ファイルのダウンロード
    response = s3.get_object(
        Bucket=BUCKET_NAME,
        Key=key
    )
    body = response['Body']
    image = Image.open(body)
    images.append(image)

# GIF作成
images[0].save(file_name, save_all=True, append_images=images[1:], duration=100, loop=0)

# =====

from slack_sdk import WebClient

SLACK_API_TOKEN = os.getenv('SLACK_API_TOKEN')
SLACK_CHANNEL = os.getenv('SLACK_CHANNEL')

slack_web_client = WebClient(token=SLACK_API_TOKEN)

title = '@channel\n家庭菜園の成長記録だよ〜 🌱🌱🌱'

response = slack_web_client.files_upload_v2(
    channels=SLACK_CHANNEL,
    file=file_name,
    initial_comment=title
)
