### CONNECT DOMAIN + SSL TO HOSTINGER VPS

GET DOMAIN

```
https://clients.domainracer.com/aff.php?aff=28826&ref=401
```

```
Domain: theblockchaincodersnode.xyz (bought from DomainRacer)
VPS IP: 72.62.228.207
SSH: ssh root@72.62.228.207
```

---

## PART 1: Point Your Domain to VPS (DomainRacer Panel)

1. Go to DomainRacer website and log in to your account
2. Click on **My Domains**
3. Click on **theblockchaincodersnode.xyz**
4. Find **DNS Management** or **DNS Zone Editor**
5. Delete any existing A records for `@` and `www`
6. Add these 2 records:

```
Type: A | Name: @   | Value: 72.62.228.207 | TTL: 3600
Type: A | Name: www | Value: 72.62.228.207 | TTL: 3600
```

7. Click Save

Done with DomainRacer. Now move to terminal.

---

## PART 2: Set Up Everything on VPS

Open your Mac terminal and run each step one by one.

### Step 1 — Connect to your VPS

```bash
ssh root@72.62.228.207
```

Enter your password when asked.

### Step 2 — Open ports for website traffic

```bash
ufw allow 80
ufw allow 443
ufw reload
```

### Step 3 — Install Nginx

```bash
apt install -y nginx
```

### Step 4 — Create website config file

```bash
nano /etc/nginx/sites-available/theblockchaincodersnode.xyz
```

This opens a text editor. Copy-paste this entire block into it:

```nginx
server {
    listen 80;
    server_name theblockchaincodersnode.xyz www.theblockchaincodersnode.xyz;

    location / {
        proxy_pass http://127.0.0.1:8545;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /ws {
        proxy_pass http://127.0.0.1:8546;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Now save and exit:

- Press Ctrl + X
- Press Y
- Press Enter

### Step 5 — Activate the config

```bash
ln -s /etc/nginx/sites-available/theblockchaincodersnode.xyz /etc/nginx/sites-enabled/
```

### Step 6 — Test and start Nginx

```bash
nginx -t
```

If it says "syntax is ok" and "test is successful", run:

```bash
systemctl restart nginx
```

### Step 7 — Install SSL certificate

```bash
apt install -y certbot python3-certbot-nginx
```

Then run:

```bash
certbot --nginx -d theblockchaincodersnode.xyz -d www.theblockchaincodersnode.xyz
```

It will ask you 3 things:

- Enter your email — type your email, press Enter
- Agree to terms? — type Y, press Enter
- Share email? — type N, press Enter

Wait a few seconds. It will say "Congratulations!" — that means SSL is installed.

### Step 8 — Make sure SSL renews automatically

```bash
certbot renew --dry-run
```

If it says "all simulated renewals succeeded" — you're all set.

---

## PART 3: Test Everything

Wait 5-30 minutes for DNS to update, then from your Mac terminal (not VPS):

```bash
curl https://theblockchaincodersnode.xyz/health
```

You can also open a browser and go to:

```
https://theblockchaincodersnode.xyz/health
```

---

## FINAL URLs

```
Health Check : https://theblockchaincodersnode.xyz/health
RPC Endpoint : https://theblockchaincodersnode.xyz
WebSocket    : wss://theblockchaincodersnode.xyz/ws
```

---

## TROUBLESHOOTING

Check Nginx status:

```bash
systemctl status nginx
```

Check Nginx error logs:

```bash
cat /var/log/nginx/error.log
```

Restart Nginx:

```bash
systemctl restart nginx
```

Check if domain is pointing to your VPS:

```bash
dig theblockchaincodersnode.xyz +short
```

Should return: 72.62.228.207

Check SSL certificate status:

```bash
certbot certificates
```

Force renew SSL if needed:

```bash
certbot renew --force-renewal
```

---

## QUICK SUMMARY (TL;DR)

1. DomainRacer DNS — Add A record `@` and `www` pointing to `72.62.228.207`
2. VPS — `ufw allow 80 && ufw allow 443 && ufw reload`
3. VPS — `apt install -y nginx`
4. VPS — Create Nginx config with `nano /etc/nginx/sites-available/theblockchaincodersnode.xyz`
5. VPS — `ln -s /etc/nginx/sites-available/theblockchaincodersnode.xyz /etc/nginx/sites-enabled/`
6. VPS — `nginx -t && systemctl restart nginx`
7. VPS — `apt install -y certbot python3-certbot-nginx`
8. VPS — `certbot --nginx -d theblockchaincodersnode.xyz -d www.theblockchaincodersnode.xyz`
9. VPS — `certbot renew --dry-run`
10. Test — `curl https://theblockchaincodersnode.xyz/health`
