import os
import glob
import re

components_dir = "/Users/achuanil/Desktop/lazza/src/components"

for file_path in glob.glob(os.path.join(components_dir, "*.jsx")):
    with open(file_path, "r") as f:
        content = f.read()
    
    original_content = content
    
    # 1. Remove { onOpenModal } from component signatures
    content = re.sub(r'export default function (\w+)\(\{ onOpenModal \}\)', r'export default function \1()', content)
    
    # 2. Remove onClick={...onOpenModal...}
    content = re.sub(r'\s*onClick=\{[^}]*onOpenModal[^}]*\}', '', content)
    
    # 3. Remove the hover overlay div that says "Click to view full screen"
    # It looks like:
    # <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
    #   <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-semibold text-slate-900 shadow-lg flex items-center gap-2">
    #     <Maximize2 className="w-4 h-4 text-sky-600" />
    #     Click to view full screen
    #   </div>
    # </div>
    # We can match this using a regex.
    overlay_pattern = r'\s*<div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">\s*<div className="bg-white/90 backdrop-blur-md px-5 py-2\.5 rounded-full text-xs font-semibold text-slate-900 shadow-lg flex items-center gap-2">\s*<Maximize2 className="w-4 h-4 text-sky-600" />\s*Click to view full screen\s*</div>\s*</div>'
    
    content = re.sub(overlay_pattern, '', content)

    # Some might use text-sky-500 instead of text-sky-600, let's be broader:
    overlay_pattern_broad = r'\s*<div className="absolute inset-0 bg-[^"]*opacity-0 group-hover:opacity-100[^>]*>\s*<div className="bg-white[^>]*>\s*<Maximize2[^>]*/>\s*Click to view full screen\s*</div>\s*</div>'
    content = re.sub(overlay_pattern_broad, '', content)
    
    # Let's remove group and cursor-pointer from the wrapper div if it had it
    # We can just remove cursor-pointer and group
    content = content.replace(" cursor-pointer group", "")
    content = content.replace(" cursor-pointer", "")
    
    # 4. Remove Maximize2 import if unused
    if "Maximize2" in content and not "Maximize2 className" in content:
        content = re.sub(r',\s*Maximize2\s*', '', content)
        content = re.sub(r'\bMaximize2,\s*', '', content)
        content = re.sub(r'import \{ Maximize2 \} from \'lucide-react\';\n', '', content)
    
    if content != original_content:
        with open(file_path, "w") as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")

print("Done")
