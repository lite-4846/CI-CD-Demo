---
title: Maintenance & Logs
sidebar_position: 6
---

To ensure Jenkins runs smoothly, perform these checks regularly:

### View Build Logs
From Jenkins Dashboard → Specific Job → Build History → Console Output.  

### Restart Jenkins
```bash
sudo systemctl restart jenkins
```

### Clean Up Old Builds
In job configuration, enable:
**Discard old builds → Keep last 10 builds**

### Backup Configuration
Back up:
- /var/lib/jenkins  
- /etc/default/jenkins  
- Credentials and plugins list  

### Troubleshooting
If a build fails:
1. Check **Console Output** for missing credentials or permissions.  
2. Run failing commands manually inside the agent container.  
3. Verify AWS ECR access.  
