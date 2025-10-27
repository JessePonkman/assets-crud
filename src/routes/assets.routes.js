import express from 'express';
import { body, param } from 'express-validator';
import { assetController } from '../controllers/assets.controller.js';
import { validate } from '../middleware/validate.js';

export const router = express.Router();

router.get('/', assetController.list);

router.get('/:id',
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  validate,
  assetController.get
);

router.post('/',
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long (max 100 chars)'),
  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['Laptop', 'Celular', 'Monitor', 'Tablet', 'Otro']).withMessage('Type not valid'),
  body('owner')
    .optional()
    .isLength({ max: 100 }).withMessage('Owner too long'),
  validate,
  assetController.create
);

router.put('/:id',
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  body('name')
    .optional()
    .isLength({ min: 1, max: 100 }).withMessage('Invalid name length'),
  body('type')
    .optional()
    .isIn(['Laptop', 'Celular', 'Monitor', 'Tablet', 'Otro']).withMessage('Invalid type'),
  body('owner')
    .optional()
    .isLength({ max: 100 }).withMessage('Owner too long'),
  validate,
  assetController.update
);

router.delete('/:id',
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  validate,
  assetController.remove
);
