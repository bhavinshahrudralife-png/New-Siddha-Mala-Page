from pathlib import Path
from PIL import Image
from rembg import remove, new_session

source = Path('/app/source_assets/reference2/gold-satin.jpg')
image = Image.open(source).convert('RGB')
image.thumbnail((1600, 1800))
session = new_session('u2netp')
result = remove(image, session=session, post_process_mask=True)
result = result.crop(result.getbbox())
result.save('/app/frontend/public/assets/rudralife/gold-mala-premium.png', optimize=True)
image.thumbnail((650, 850))
image.save('/app/source_assets/reference2/gold-small.jpg')
result.thumbnail((650, 850))
background = Image.new('RGBA', result.size, '#faf8f4')
background.alpha_composite(result)
background.convert('RGB').save('/app/source_assets/reference2/gold-preview.jpg')
print('Prepared gold PNG', result.size)