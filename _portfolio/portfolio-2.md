---
title: "Soccer Player Identification with ResNet"
excerpt: "Identifying 831 professional soccer players from 50 images per player using ResNet-18 transfer learning, achieving 30.88% accuracy on a high-cardinality, low-sample dataset."
collection: portfolio
---

*Daniel Caro, Ameer Kayed, Ali Yahya · Dataset: [FIFA 2022 All Players Image Dataset](https://www.kaggle.com/datasets/soumendraprasad/fifa-2022-all-players-image-dataset) (Kaggle)*

### Introduction

The objective of this project is to develop an automated system for identifying professional soccer players from static images. In sports broadcasting and digital archiving, rapidly categorizing large volumes of visual data by athlete identity is a significant challenge. We address this with deep transfer learning by leveraging a ResNet-18 pre-trained on ImageNet as a feature extractor, adapted to facial and jersey recognition while minimizing computational cost.

### Dataset

Curated from the 2022 FIFA World Cup:

* **831 unique classes** (one per professional player), **50 images per player** → ~41,550 images total. Labels derived from folder directory names.
* **Split:** 70% training / 15% validation / 15% testing via a custom dataset class.
* **Preprocessing:** Resized to 224×224, normalized to ImageNet standards.
* **Augmentation:** Light augmentation only: horizontal flips, 20° rotations, and color jittering. Aggressive augmentations (e.g., random resized cropping) were found to hurt performance by cropping out distinguishing features.

The small per-class sample size makes this a challenging high-cardinality classification task where generalization is critical.

### Model Description

**Architecture:** ResNet-18 (18 layers deep). Its residual learning blocks use shortcut / identity connections to mitigate vanishing gradients, allowing effective training even with limited data per class.

**Transfer learning:** Initialized with ImageNet weights (early layers capture general edges/textures). Replaced the final 1,000-class fully connected layer with a new linear layer for the 831 World Cup players, preserving pre-trained vision while specializing the classifier.

**Optimization:** Adam optimizer (adaptive per-parameter learning rates for sparse/noisy gradients) with cross-entropy loss (ideal for multi-class classification, penalizing confident but incorrect predictions).

**Key insight: full fine-tuning:** Initially freezing the ResNet backbone was insufficient for distinguishing similar uniforms/faces. Unfreezing the entire network and fine-tuning all convolutional layers with a very low learning rate (0.0001) allowed the model to shift from general objects to soccer-specific features without erasing pre-trained knowledge.

### Experiments Analysis

Six main attempts:

| Attempt | Key Configuration | Epochs | Test Acc | Runtime |
|---|---|---|---|---|
| 1 | Frozen ResNet backbone, train only new FC layer, lr=0.001 | 10 | 2.68% | 43 min |
| 2 | Intended full unfreeze (implementation error, similar to #1), lr=0.001 | 10 | 2.95% | 45 min |
| 3 | Data augmentation with random resized cropping, lr=0.001 | 10 | 0.13% | 1h 55min |
| 4 | Replace random resized cropping with normal resize, lr=0.0005 | 20 | 5.35% | 3h 43min |
| 5* | Successfully unfroze ResNet-18 backbone, lr=0.0001 | 30 | N/A | Aborted |
| 6 | Same as #5 but lowered epochs for manageable training, lr=0.0001 | 15 | **30.88%** | 5h 29min |

\*Attempt 5 was aborted after ~15 epochs when training/validation accuracy plateaued; re-trained as Attempt 6.

Early high learning rates (0.001) and frozen backbones yielded <3% accuracy; aggressive cropping was actively harmful. Full fine-tuning at lr=0.0001 finally allowed convergence.

### Conclusion & Learnings

This project highlights the difficulty of high-cardinality classification with limited per-class data. Key takeaways:

* With 831 classes × 50 images each, the model required full ResNet-18 fine-tuning to succeed.
* Learning rate sensitivity was critical: 0.001 was too aggressive, 0.0001 enabled stable learning.
* Augmentation must be chosen carefully. Flips and color jitter helped, while aggressive cropping hurt.

Achieving **30.88% test accuracy on 800+ classes with only 50 images per player** demonstrates the effectiveness of transfer learning in complex, real-world scenarios.

*Tools: Python, PyTorch (ResNet-18), ImageNet pre-training, custom dataset pipeline.*

Dataset: [FIFA 2022 All Players Image Dataset — Kaggle](https://www.kaggle.com/datasets/soumendraprasad/fifa-2022-all-players-image-dataset)
