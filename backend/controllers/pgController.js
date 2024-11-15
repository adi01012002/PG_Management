// controllers/pgController.js

import PG from '../models/PgModel.js';

export const registerPG = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name,location, totalRooms, totalBeds } = req.body;
    console.log(req.body);

    // Ensure no duplicate PG registration by the same user
    // const existingPG = await PG.findOne({ owner: userId });
    // if (existingPG) {
    //   return res.status(400).json({ message: 'PG already registered for this user' });
    // }

    // Create the PG with initial room and bed setup
    const pg = new PG({
      name,
      location,
      owner: userId,
      totalRooms,
      totalBeds,
      availableRooms: totalRooms, // Initial available rooms
      availableBeds: totalBeds,   // Initial available beds
    });

    await pg.save();
    res.status(201).json({ message: 'PG registered successfully', pg });
  } catch (error) {
    res.status(500).json({ message: 'Error registering PG', error });
  }
};


export const getPGData = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch PG data for the logged-in user
      const pg = await PG.findOne({ owner: userId });
  
      if (!pg) {
        return res.status(404).json({ message: 'PG not found' });
      }
  
      res.status(200).json({
        name:pg.name,
        totalStudents: pg.students.length,
        availableRooms: pg.availableRooms,
        availableBeds: pg.availableBeds,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching PG data', error });
    }
  };