import requests
import os

# List of icons to download
icons = [
    {"icon": 113},
    {"icon": 116},
    {"icon": 119},
    {"icon": 122},
    {"icon": 143},
    {"icon": 176},
    {"icon": 179},
    {"icon": 182},
    {"icon": 185},
    {"icon": 200},
    {"icon": 227},
    {"icon": 230},
    {"icon": 248},
    {"icon": 260},
    {"icon": 263},
    {"icon": 266},
    {"icon": 281},
    {"icon": 284},
    {"icon": 293},
    {"icon": 296},
    {"icon": 299},
    {"icon": 302},
    {"icon": 305},
    {"icon": 308},
    {"icon": 311},
    {"icon": 314},
    {"icon": 317},
    {"icon": 320},
    {"icon": 323},
    {"icon": 326},
    {"icon": 329},
    {"icon": 332},
    {"icon": 335},
    {"icon": 338},
    {"icon": 350},
    {"icon": 353},
    {"icon": 356},
    {"icon": 359},
    {"icon": 362},
    {"icon": 365},
    {"icon": 368},
    {"icon": 371},
    {"icon": 374},
    {"icon": 377},
    {"icon": 386},
    {"icon": 389},
    {"icon": 392},
    {"icon": 395}
]

# Base URL for downloading the icons
base_url = "https://cdn.weatherapi.com/weather/64x64/day/"

# Directory to save the icons
save_dir = "weather_icons"
os.makedirs(save_dir, exist_ok=True)

# Download each icon
for icon in icons:
    icon_id = icon["icon"]
    url = f"{base_url}{icon_id}.png"
    response = requests.get(url)
    if response.status_code == 200:
        file_path = os.path.join(save_dir, f"{icon_id}.png")
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded {file_path}")
    else:
        print(f"Failed to download {url}")

print("All downloads complete.")
