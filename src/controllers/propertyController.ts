import { Request, Response } from 'express';
import { PropertyService } from '../services/propertyService';
import { PropertyRequest } from '../types';

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  async getPropertyData(req: Request<{}, {}, PropertyRequest>, res: Response) {
    try {
      const { location } = req.body;

      if (!location) {
        return res.status(400).json({ error: 'Location is required' });
      }

      const propertyData = await this.propertyService.getPropertyData(location);
      res.json(propertyData);
    } catch (error) {
      console.error('Error in getPropertyData controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
