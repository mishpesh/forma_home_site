from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlretrieve
from pathlib import Path
assets={
'hero':'photo-1600210492486-724fe5c67fb0',
'living':'photo-1600607687920-4e2a09cf159d',
'kitchen':'photo-1556912172-45b7abe8b7e1',
'villa':'photo-1600607687939-ce8a6c25118c',
'bathroom':'photo-1620626011761-996317b8d101',
'dining':'photo-1616486338812-3dadae4b4ace',
'studio':'photo-1497366754035-f200968a6e72',
'bedroom':'photo-1616486029423-aaa4789e8c9a',
'detail':'photo-1600210491892-03d54c0aaf87',
'house':'photo-1600047509807-ba8f99d2cdde',
'workspace':'photo-1497366811353-6870744d04b2',
}
def download(item):
 name,id=item
 url=f'https://images.unsplash.com/{id}?auto=format&fit=crop&w=2000&q=85'
 try:
  urlretrieve(url,Path('public/images')/(name+'.jpg'))
  return name+' OK'
 except Exception as e: return name+' '+str(e)
with ThreadPoolExecutor(max_workers=6) as pool:
 for result in pool.map(download,assets.items()): print(result)
