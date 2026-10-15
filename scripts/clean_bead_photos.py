"""Regenerate genuine product cutouts, preserving texture rather than chroma holes."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import binary_fill_holes, label
from rembg import remove, new_session

root=Path('/app/source_assets/rudralife')
out=Path('/app/frontend/public/assets/rudralife')
archive=Path('/app/source_assets/peach')
session=new_session('u2netp')
sheet=Image.new('RGB',(1000,800),'#f8e1d5'); draw=ImageDraw.Draw(sheet)
for n in range(1,17):
    source=root/f'bead-{n}-original.jpg'
    if n==16: source=root/'bead-16-gallery-2.png'
    image=Image.open(source).convert('RGB');image.thumbnail((1000,1000))
    result=remove(image,session=session,post_process_mask=True)
    alpha=np.array(result.getchannel('A'))
    # Fill false transparent pits in the original matte, not the source texture.
    solid=binary_fill_holes(alpha>100)
    labels,count=label(solid)
    if count:
        sizes=np.bincount(labels.ravel()); sizes[0]=0
        solid=labels==sizes.argmax()
    mask=Image.fromarray((solid*255).astype('uint8')).filter(ImageFilter.GaussianBlur(.45))
    result=Image.merge('RGBA',(*image.split(),mask))
    result=result.crop(result.getbbox());result.thumbnail((550,550))
    pad=Image.new('RGBA',(result.width+24,result.height+24));pad.alpha_composite(result,(12,12));pad.save(out/f'bead-clean-{n}.png',optimize=True)
    thumb=pad.copy();thumb.thumbnail((160,150));x=((n-1)%5)*200;y=((n-1)//5)*200
    sheet.paste(thumb,(x+(180-thumb.width)//2,y),thumb);draw.text((x+15,y+160),f'{n} Mukhi' if n<15 else ['Gauri Shankar','Ganesh'][n-15],fill='#613b2a')
sheet.save(archive/'clean-beads.jpg')
print('Prepared 16 original-photo PNGs without chroma-cutout holes.')