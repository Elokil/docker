---
description: Audit complet (ou ciblé) de l'infra Docker projetaethari.com — sécurité, config, backup, CI/CD, priorisé par sévérité.
argument-hint: [périmètre optionnel : sécurité | docker-compose | nginx | backup | cicd — vide = audit complet]
---

Lance un audit de l'infra Docker de ce repo (`docker-compose.yml`, `nginx/`, `gitea/`, `docker.env`), basé sur l'état **actuel** des fichiers, pas sur un audit précédent en mémoire.

Périmètre demandé : $ARGUMENTS (si vide, audite l'ensemble de la stack).

## Étapes

1. Invoke en parallèle, dans un seul message (plusieurs appels au tool Agent), les spécialistes pertinents au périmètre demandé — tous si le périmètre est vide :
   - `infra-security-auditor` → secrets versionnés dans git, credentials faibles/par défaut, ports exposés inutilement, durcissement général
   - `docker-compose-engineer` → versions d'images (obsolètes ou `latest` sur du stateful), `depends_on` sans condition de santé, healthchecks manquants, cohérence des volumes/réseaux
   - `nginx-tls-engineer` → cohérence du routage par sous-domaine, validité et portée du certificat, limites manquantes (`client_max_body_size`, websockets) sur un nouveau service
   - `backup-recovery-engineer` → existence et pertinence d'une stratégie de sauvegarde pour les volumes critiques (postgres, minio, gitea)
   - `cicd-gitea-engineer` → état du pipeline CI/CD (Gitea Actions activé ou non, build/déploiement manuel vs automatisé)

   Donne à chaque agent un brief autosuffisant : il doit auditer l'état réel des fichiers, pas supposer.

2. Attends tous les résultats.

3. Synthétise en **un seul rapport**, structuré par sévérité et non par agent d'origine :
   - **Critique** — risque réel et immédiat (secret compromis, service critique sans backup, etc.)
   - **Important** — dette ou risque significatif mais pas urgent
   - **Optimisation** — amélioration sans urgence

   Pour chaque point : le problème concret, le fichier/ligne concerné, l'impact réel, et une remédiation actionnable. N'applique aucune remédiation automatiquement — l'audit est un rapport, pas une action.

4. Termine par une liste priorisée des 3 à 5 actions à traiter en premier.

Réponds en français, de façon dense et actionnable — pas de préambule.
