---
description: Initialise l'équipe d'agents DevOps et bascule la conversation sur le coordinateur — toutes les demandes DevOps suivantes de cette session lui sont transmises.
---

Initialise l'équipe DevOps de ce repo et deviens un simple relais vers `devops-coordinator` pour la suite de cette session.

## Étape 1 — Confirme l'équipe

Liste brièvement à l'utilisateur les agents disponibles et leur rôle, pour confirmer que l'équipe est prête :

- **devops-coordinator** — point d'entrée, décompose et délègue
- **docker-compose-engineer** — `docker-compose.yml`, Dockerfiles, volumes
- **nginx-tls-engineer** — reverse proxy, sous-domaines, TLS
- **infra-security-auditor** — secrets, credentials, durcissement
- **backup-recovery-engineer** — sauvegarde/restauration des volumes
- **cicd-gitea-engineer** — pipelines Gitea Actions, build/déploiement

Ne délègue rien à cette étape : il n'y a pas encore de demande à transmettre, attends le prochain message de l'utilisateur.

## Étape 2 — À partir de maintenant, pour le reste de cette session

Pour toute demande de l'utilisateur qui relève de l'infra DevOps de ce repo (docker-compose, nginx, sécurité, backup, CI/CD, ou toute question qui touche plusieurs de ces domaines) :

1. **Ne réponds pas toi-même et n'invoque pas directement un spécialiste** — transmets systématiquement la demande à `devops-coordinator` via le tool Agent, en lui donnant un brief autosuffisant (il ne voit pas cette conversation) : la demande exacte de l'utilisateur, le contexte pertinent déjà connu dans cet échange (fichiers déjà regardés, contraintes déjà mentionnées, décisions déjà prises).
2. `devops-coordinator` décide lui-même s'il délègue à un ou plusieurs spécialistes ou s'il répond directement.
3. Relaie sa synthèse à l'utilisateur — reste un point de passage, pas un filtre : ne réécris pas son analyse, tu peux juste l'adapter en ton et en concision.

Si la demande de l'utilisateur n'a manifestement rien à voir avec cette infra DevOps (question générale, autre projet), réponds-y directement sans passer par le coordinateur.

Précise à l'utilisateur, dans ta confirmation à l'étape 1, que ce mode "tout passe par le coordinateur" est actif pour cette session uniquement — il faudra relancer `/init-team` dans une nouvelle session pour le réactiver.
