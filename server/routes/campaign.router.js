const express = require('express');
const encryptLib = require('../modules/encryption');
const isAuthenticated = require('../modules/isAuthenticated');
const Person = require('../models/Person');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// POST campaign to the database
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    const campaign_name = req.body.campaign_name;
    const campaign_notes = req.body.campaign_notes;
    const user_id = req.body.user_id;
    var saveCampaign = {
      campaign_name: campaign_name,
      campaign_notes: campaign_notes,
      user_id: user_id
    }
    const queryText = 'INSERT INTO campaign (campaign_name, campaign_notes, user_id) VALUES ($1, $2, $3';
    pool.query(queryText, [saveCampaign.campaign_name, saveCampaign.campaign_notes, saveCampaign.user_id], (err, result) => {
      if (err) {
        console.log('Error inserting data into campaign', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    })
  } else {
    res.sendStatus(403);
  }
})

// GET campaign based on user.id
router.get('/campaign/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = 'SELECT campaign_id, campaign.campaign_name, campaign.campaign_notes campaign.character_id FROM campaign JOIN users ON users.id = campaign.user_id WHERE campaign.user_id=$1';
    pool.query(queryText, [req.params.id], (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(results.row);
      }
    })
  } else {
    res.sendStatus(403);
  }
})

// GET characters based on campaign_id
router.get('/character', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = 'SELECT character.character_id, character_name, character_icon FROM character';
    pool.query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
})

// DELETE campaign from campaign table
router.delete('/:id', function (req, res) {
  if (req.isAuthenticated()) {
    const queryText = 'DELETE FROM campaign WHERE id=$1';
    pool.query(queryText, [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
})