Step-by-Step: Deploy to Hostinger VPS
STEP 1: Connect to Your VPS
Open your terminal (on your Mac) and SSH into the VPS:

#### Connect

```
ssh root@YOUR_VPS_IP
Enter your root password when prompted.
```

STEP 2: Install Docker & Docker Compose (on VPS)
Copy-paste this entire block — it installs everything in one go:

```
apt update && apt install -y docker.io docker-compose-v2 git
systemctl start docker
systemctl enable docker
```

Verify Docker is working:


```
docker --version
docker compose version
```

STEP 3: Upload Your Project to the VPS
Option A: Using scp (from your Mac, open a NEW terminal tab)

```
cd /Users/YOUR_LOCATION/Documents/ethereum-blockchain
scp -r .env Dockerfile docker-compose.yml package.json package-lock.json src/ scripts/ root@YOUR_VPS_IP:/root/ethereum-blockchain/
```

STEP 4: Open Firewall Ports (on VPS)
Back in your VPS SSH session:

```
ufw allow 22
ufw allow 8545
ufw allow 8546
ufw allow 30303
ufw --force enable
```

This opens:

8545 — HTTP RPC (API)
8546 — WebSocket
30303 — P2P Network
STEP 5: Build & Start the Blockchain (on VPS)

```
cd /root/ethereum-blockchain
docker compose up -d --build
```

This will:

Build the Docker image (takes 1-2 minutes first time)
Start the blockchain node in the background
STEP 6: Verify It's Running

```
docker compose ps
```

You should see the container as running (healthy).

Check the logs:


```
docker compose logs -f
```

(Press Ctrl+C to exit logs)

Test the API:

```
curl http://localhost:8545/health
```

STEP 7: Access From Anywhere
Your blockchain is now accessible at:

Service	URL
HTTP RPC	http://YOUR_VPS_IP:8545
Health Check	http://YOUR_VPS_IP:8545/health
WebSocket	ws://YOUR_VPS_IP:8546
P2P Network	YOUR_VPS_IP:30303
Test from your Mac:


curl http://YOUR_VPS_IP:8545/health
Useful Commands (run on VPS)
Command	What it does

```
docker compose logs -f	View live logs
docker compose restart	Restart the node
docker compose down	Stop the node
docker compose up -d --build	Rebuild & start
docker compose ps	Check status
```

Quick Summary (TL;DR)

1. ssh root@YOUR_VPS_IP
2. apt update && apt install -y docker.io docker-compose-v2 git
3. (from Mac) rsync -avz --exclude='node_modules' --exclude='.DS_Store' /Users/YOUR_LOCATION/Documents/ethereum-blockchain/ root@YOUR_VPS_IP:/root/ethereum-blockchain/
4. (back on VPS) ufw allow 22 && ufw allow 8545 && ufw allow 8546 && ufw allow 30303 && ufw --force enable
5. cd /root/ethereum-blockchain && docker compose up -d --build
6. curl http://YOUR_VPS_IP:8545/health

That's it — 6 commands and your Ethereum blockchain is live on your Hostinger VPS!

### troubleshooting

```
ssh-keygen -R YOUR_VPS_IP
```

