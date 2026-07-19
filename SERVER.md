# Serveur cible — projetaethari.com

Référence factuelle sur l'hôte qui fait tourner cette stack Docker Compose. Les agents DevOps de ce repo (`.claude/agents/`) doivent lire ce fichier avant de proposer des changements liés au dimensionnement, aux chemins hôte, au réseau ou aux certificats — plutôt que de deviner.

## Hébergement

- **Fournisseur** : OVH (VPS)
- **OS** : Ubuntu 25.04 "Plucky Puffin" (confirmé via `lsb_release -a`) — **version interim, pas LTS** : support de sécurité ~9 mois (fin estimée ~janvier 2026), donc upgrade OS à planifier bien plus tôt que sur une LTS (24.04, support 5 ans). À signaler dans tout audit sécurité/maintenance.
- **Hostname VPS** : `vps-bbfcffb4`
- **Utilisateur d'accès** : `ubuntu`

## Ressources

- **vCores** : 8
- **RAM** : 24 Go
- **Stockage** : 200 Go

Ces 8 services (backend, angular-builder, frontend/nginx, postgres, redis, outline, gitea, portainer, minio) tournent tous sur ce seul VPS — à garder en tête pour tout dimensionnement (limites mémoire/CPU par conteneur, alerte sur l'espace disque restant avant d'ajouter un service ou d'activer des backups locaux).

## Réseau / Firewall

- **Confirmé (utilisateur, 2026-07-19) : aucune configuration de sécurité réseau n'a été faite depuis la mise en place du serveur.** Pas de `ufw`/`iptables` custom, pas de pare-feu OVH configuré. Conséquence directe : **tous les ports publiés dans `docker-compose.yml` sont probablement directement exposés à internet**, y compris `postgres:5432` (identifiants faibles `admin/admin`) et `redis:6379` (pas d'auth par défaut) — pas seulement les services censés être publics (nginx 80/443). C'est un point **critique** à traiter en priorité, pas juste "à vérifier" : `infra-security-auditor` doit le traiter comme confirmé, pas comme hypothèse.

## Certificats TLS (Let's Encrypt)

- Montés en lecture seule dans `frontend` depuis `/etc/letsencrypt` sur l'hôte.
- Mécanisme de renouvellement (cron, systemd timer certbot, autre) — **non confirmé**. Ne pas supposer qu'il est automatisé sans vérification.

## Chemins hôte utilisés par docker-compose.yml

- `/app/express` → code source du backend Node
- `/app/angular/dockerTest` → code source Angular (build)
- `/app/angular/dist` → sortie du build Angular
- `/etc/letsencrypt` → certificats TLS

Structure exacte au-delà de ces points de montage — **non confirmée**.

## Sauvegardes

- Aucune stratégie de backup confirmée à ce jour côté serveur (voir `backup-recovery-engineer`).

---
*Dernière mise à jour : 2026-07-19. À tenir à jour si le serveur change (montée de version Ubuntu, changement de ressources VPS, migration de fournisseur).*
