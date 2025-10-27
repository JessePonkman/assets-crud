import { Asset } from '../models/Asset.js';

export const assetController = {
  async list(req, res) {
    const assets = await Asset.findAll({ order: [['id', 'ASC']] });
    res.json(assets);
  },

  async get(req, res) {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  },

  async create(req, res) {
    const { name, type, owner } = req.body;
    if (!name || !type) return res.status(400).json({ error: 'Name and type required' });
    const newAsset = await Asset.create({ name, type, owner });
    res.status(201).json(newAsset);
  },

  async update(req, res) {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    await asset.update(req.body);
    res.json(asset);
  },

  async remove(req, res) {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    await asset.destroy();
    res.status(204).send();
  }
};
