from concurrent.futures import ThreadPoolExecutor
import subprocess

# URL to send the request to
url = "https://frontend-api.pump.fun/trades/all/AXMTDmzk9r87JqygGaKsN3ocQ5sAvtV2ej84dYZJpump?limit=200&offset=0&minimumSize=50000000"

# Function to execute the curl command
def send_request():
    try:
        subprocess.run(["curl", url], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except subprocess.CalledProcessError as e:
        print(f"Request failed: {e}")

# Total number of requests
total_requests = 10000

# Number of threads
num_threads = 100

# Create a ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=num_threads) as executor:
    # Submit the send_request function 10,000 times
    futures = [executor.submit(send_request) for _ in range(total_requests)]

# Wait for all futures to complete
print("All requests completed!")
