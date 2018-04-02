const express = require('express');
const encryptLib = require('../modules/encryption');
const isAuthenticated = require('../modules/isAuthenticated');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// POST campaign to the database
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    const campaign_name = req.body.campaign_name;
    const campaign_notes = req.body.campaign_notes;
    const user_id = req.body.user_id;
    console.log(campaign_name);

    var saveCampaign = {
      campaign_name: campaign_name,
      campaign_notes: campaign_notes,
      user_id: user_id
    }
    console.log(saveCampaign);

    const queryText = `INSERT INTO campaign (campaign_name, campaign_notes, user_id) VALUES ($1, $2, $3)`;
    pool.query(queryText, [saveCampaign.campaign_name, saveCampaign.campaign_notes, saveCampaign.user_id])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
})

// POST character to the database
router.post('/character', (req, res) => {
  console.log(req.body);

  if (req.isAuthenticated()) {
    const character_name = req.body.character_name;
    const character_icon = req.body.character_icon;
    const campaign_id = req.body.campaign_id;
    console.log(character_name);

    var saveCharacter = {
      character_name: character_name,
      character_icon: character_icon,
      campaign_id: campaign_id
    }

    console.log(saveCharacter);

    const queryText = `INSERT INTO character (character_name, character_icon, campaign_id) VALUES ($1, $2, $3)`;
    pool.query(queryText, [saveCharacter.character_name, saveCharacter.character_icon, saveCharacter.campaign_id])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
})

// POST monster to the database
router.post('/monster', (req, res) => {
  console.log(req.body);

  if (req.isAuthenticated()) {
    const monster_name = req.body.monster_name;
    const monster_icon = req.body.monster_icon;

    var saveMonster = {
      monster_name: monster_name,
      monster_icon: monster_icon
    }

    console.log(saveMonster);

    const queryText = `INSERT INTO monster (monster_name, monster_icon) VALUES ($1, $2)`;
    pool.query(queryText, [saveMonster.monster_name, saveMonster.monster_icon])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
})

// POST encounter to the database
router.post('/encounter', (req, res) => {
  if (req.isAuthenticated()) {
    const encounter_name = req.body.encounter_name;
    const campaign_id = req.body.campaign_id;

    var saveEncounter = {
      encounter_name: encounter_name,
      campaign_id: campaign_id
    }

    const monster_name = req.body.monster_name;
    const monster_icon = req.body.monster_icon;

    var saveMonster = {
      monster_name: monster_name,
      monster_icon: monster_icon
    }

    const character_name = req.body.character_name;
    const character_icon = req.body.character_icon;

    var saveEncounterCharacter = {
      character_id: character_id,
      encounter_id: encounter_id,
    }

    const queryText = 'INSERT INTO encounter (encounter_name, campaign_id) VALUES ($1, $2)';
    pool.query(queryText, [saveEncounterCharacter.encounter_name, saveEncounterCharacter.campaign_id], (err, result) => {
      if (err) {
        console.log('Error inserting data into encounter', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    })

    for (var character of characterList.List) {
      const queryText = 'INSERT INTO encounter_character (character_id, encounter_id) VALUES ($1, $2)';
      pool.query(queryText, [saveEncounter.encounter_name, saveEncounter.campaign_id], (err, result) => {
        if (err) {
          console.log('Error inserting data into encounter', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(403);
        }
      })
    }

    for (var monster of monsterList.List) {
      const queryText = 'INSERT INTO encounter_monster (monster_id, encounter_id) VALUES ($1, $2)';
      pool.query(queryText, [saveEncounter.encounter_name, saveEncounter.campaign_id], (err, result) => {
        if (err) {
          console.log('Error inserting data into encounter', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(403);
        }
      })
    }
  }
})


// GET campaign based on user:id
router.get('/users/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;

    const queryText = `SELECT campaign.campaign_id, campaign.campaign_name, campaign.campaign_notes FROM campaign WHERE campaign.user_id=${id}`;
    pool.query(queryText)
      .then(function (result) {
        res.send(result.rows);
      })
      .catch(function (result) {
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
})

// GET characters based on campaign_id
router.get('/character/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    console.log(id);

    const queryText = `SELECT character.character_id, character_name, character_icon, campaign_id FROM character WHERE character.campaign_id=$1`;
    pool.query(queryText, [id])
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

// GET monsters based on campaign_id
router.get('/monster/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const queryText = `SELECT monster.monster_id, monster_name, monster_icon, campaign_id FROM monster WHERE monster.campaign_id=$1`;
    pool.query(queryText, [id])
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

// GET encounters based on campaign_id
router.get('/encounter', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const queryText = `SELECT encounter.encounter_id, encounter_name, campaign_id FROM  encounter WHERE encounter.campaign_id=$1`;
    pool.query(queryText, [id])
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
    const id = req.params.id;
    const queryText = `DELETE FROM campaign WHERE id=$1`;
    pool.query(queryText, [id])
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

// DELETE character from character list based on campaign id
router.delete('/character/:id', function (req, res) {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    console.log(id);
    const queryEncounterCharacter = `DELETE FROM encounter_character WHERE character_id=$1;`;
    const queryCharacter = `DELETE FROM character WHERE character_id=$1`;

    pool.query(queryEncounterCharacter, [id])
      .then((result) => {
        console.log(result);

      })
      .catch((err) => {
        console.log(err);

      })
    pool.query(queryCharacter, [id])
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

// DELETE character from character list based on campaign id
router.delete('/monster/:id', function (req, res) {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    console.log(id);
    const queryEncounterMonster = `DELETE FROM encounter_monster WHERE monster_id=$1;`;
    const queryMonster = `DELETE FROM monster WHERE monster_id=$1`;

    pool.query(queryEncounterMonster, [id])
      .then((result) => {
        console.log(result);

      })
      .catch((err) => {
        console.log(err);

      })
    pool.query(queryMonster, [id])
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

// DELETE encounterfrom character list based on campaign id
router.delete('/encounter/:id', function (req, res) {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const queryText = `DELETE FROM encounter WHERE id=$1`;
    pool.query(queryText, [id])
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

module.exports = router;