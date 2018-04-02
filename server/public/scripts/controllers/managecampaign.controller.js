myApp.controller('CampaignServiceController', ['$http', 'UserService', 'CampaignService', '$scope', '$element', function ($http, UserService, CampaignService, $scope, $element) {
  console.log('CampaignServiceController created');
  var self = this;

  // CampaignService variable storage
  self.campaignList = [];

  self.characterList = [];

  self.monsterList = [];

  self.encounterList = [];

  // UserService variables
  self.userService = UserService;
  self.userObject = UserService.userObject;

  // CampaignService variables
  self.campaignService = CampaignService;
  self.campaignList = CampaignService.campaignList;
  self.getCampaignNotes = CampaignService.getCampaignNotes;
  self.message = CampaignService.message;
  self.characterList = CampaignService.characterList;
  self.getCharacterList = CampaignService.getCharacterList;
  self.getMonsterList = CampaignService.getMonsterList;
  self.getEncounterList = CampaignService.getEncounterList;
  self.encounterList = CampaignService.encounterList;
  self.monsterList = CampaignService.monsterList;
  self.encounterList = CampaignService.encounterList;
  self.campaign_id = CampaignService.campaign_id;
  self.character_id = CampaignService.character_id;
  self.monster_id = CampaignService.monster_id;
  self.showAddCampaign = false;
  self.showAddCharacter = false;
  self.showAddMonster = false;
  self.showAddEncounter = false;

  // Campaign object 
  self.campaign = {
    campaign_id: '',
    campaign_name: '',
    campaign_notes: '',
    user_id: self.userObject.id
  };

  // Character object 
  self.character = {
    character_id: '',
    character_name: '',
    character_icon: '',
    campaign_id: ''
  };

  // Monster object 
  self.monster = {
    monster_id: '',
    monster_name: '',
    monster_icon: '',
    campaign_id: ''
  };

  // Encounter object 
  self.encounter = {
    encounter_id: '',
    encounter_name: '',
    campaign_id: ''
  };

  // Character Icon List
  $scope.classes = [{
      value: 'Male Barbarian',
      image: './images/characters/barbarian_male_alive.gif'
    },
    {
      value: 'Female Barbarian',
      image: './images/characters/barbarian_female_alive.gif'
    },
    {
      value: 'Male Bard',
      image: './images/characters/bard_male_alive.gif'
    },
    {
      value: 'Female Bard',
      image: './images/characters/bard_female_alive.gif'
    },
    {
      value: 'Male Cleric',
      image: './images/characters/cleric_male_alive.gif'
    },
    {
      value: 'Female Cleric',
      image: './images/characters/cleric_female_alive.gif'
    },
    {
      value: 'Male Druid',
      image: './images/characters/druid_male_alive.gif'
    },
    {
      value: 'Female Druid',
      image: './images/characters/druid_female_alive.gif'
    },
    {
      value: 'Male Fighter',
      image: './images/characters/fighter_male_alive.gif'
    },
    {
      value: 'Female Fighter',
      image: './images/characters/fighter_female_alive.gif'
    },
    {
      value: 'Male Monk',
      image: './images/characters/monk_male_alive.gif'
    },
    {
      value: 'Female Monk',
      image: './images/characters/monk_female_alive.gif'
    },
    {
      value: 'Male Paladin',
      image: './images/characters/paladin_male_alive.gif'
    },
    {
      value: 'Female Paladin',
      image: './images/characters/paladin_female_alive.gif'
    },
    {
      value: 'Male Ranger',
      image: './images/characters/ranger_male_alive.gif'
    },
    {
      value: 'Female Ranger',
      image: './images/characters/ranger_female_alive.gif'
    },
    {
      value: 'Male Rogue',
      image: './images/characters/rogue_male_alive.gif'
    },
    {
      value: 'Female Rogue',
      image: './images/characters/rogue_female_alive.gif'
    },
    {
      value: 'Male Sorcerer',
      image: './images/characters/sorcerer_male_alive.gif'
    },
    {
      value: 'Female Sorcerer',
      image: './images/characters/sorcerer_female_alive.gif'
    },
    {
      value: 'Male Warlock',
      image: './images/characters/warlock_male_alive.gif'
    },
    {
      value: 'Female Warlock',
      image: './images/characters/warlock_female_alive.gif'
    },
    {
      value: 'Male Wizard',
      image: './images/characters/wizard_male_alive.gif'
    },
    {
      value: 'Female Wizard',
      image: './images/characters/wizard_female_alive.gif'
    }
  ];

  $scope.monsters = [{
      value: 'Abberation',
      image: './images/monsters/aberration.jpg'
    },
    {
      value: 'Beast',
      image: './images/monsters/beast.jpg'
    },
    {
      value: 'Celestial',
      image: './images/monsters/celestial.jpg'
    },
    {
      value: 'Construct',
      image: './images/monsters/construct.jpg'
    },
    {
      value: 'Dragon',
      image: './images/monsters/dragon.jpg'
    },
    {
      value: 'Elemental',
      image: './images/monsters/elemental.jpg'
    },
    {
      value: 'Fey',
      image: './images/monsters/fey.jpg'
    },
    {
      value: 'Fiend',
      image: './images/monsters/fiend.jpg'
    },
    {
      value: 'Giant',
      image: './images/monsters/giant.jpg'
    },
    {
      value: 'Humanoid',
      image: './images/monsters/humanoid.jpg'
    },
    {
      value: 'Monstrosity',
      image: './images/monsters/monstrosity.jpg'
    },
    {
      value: 'Ooze',
      image: './images/monsters/ooze.jpg'
    },
    {
      value: 'Plant',
      image: './images/monsters/plant.jpg'
    },
    {
      value: 'Undead',
      image: './images/monsters/undead.jpg'
    },
  ];

  $scope.onChange = function () {
    console.log(self.campaignList.list);
    self.getCampaignId(self.campaignList.list);
    swal({
      title: "The Campaign Is Loaded!",
      icon: "../images/sweetalerts/loadcampaign.png"
    })
  };

  $scope.onLoad = function () {
    console.log(self.encounterList.list);
    self.getCampaignId(self.encounterList.list);
    swal({
      title: "The Encounter Is Loaded!",
      icon: "../images/sweetalerts/loadencounter.png"
    })
  };

  self.getCampaignId = function (campaign) {
    console.log(campaign);
    id = campaign[0].campaign_id;
    console.log(id);
    self.getCharacterList(id);
    self.getMonsterList(id);
    self.getEncounterList(id);
  }

  // CAMPAIGN: CampaignService to get the list of campaigns
  self.getCampaignList = function () {
    CampaignService.getCampaignList(self.campaign);
  }

  // CAMPAIGN: Run the getCampaignList function
  console.log(self.userObject);
  self.getCampaignList(self.userObject.id);


  // CAMPAIGN: Get the campaignList variable
  self.campaignList = CampaignService.campaignList;

  // CAMPAIGN: CampaignSerivce to add a campaign
  self.addCampaign = function (campaign, user_id) {
    CampaignService.addCampaign(self.campaign, self.userObject.id);
  }

  // CHARACTER: Get the characterList variable
  self.characterList = CampaignService.characterList;

  // CHARACTER: CampaignSerivce to add a character
  self.addCharacter = function (character, campaign) {
    CampaignService.addCharacter(character, campaign.campaign_id);
  }

  // CHARACTER: CampaignService to delete a character  
  self.deleteCharacter = function (character, character_id) {
    console.log(character);
    CampaignService.deleteCharacter(character, character.character_id);
  }

  // MONSTER: Get the monsterList variable
  self.monsterList = CampaignService.monsterList;

  // MONSTER: CampaignSerivce to add a monster
  self.addMonster = function (monster, campaign) {
    CampaignService.addMonster(monster, campaign.campaign_id);
  }

  // MONSTER: CampaignService to delete a monster 
  self.deleteMonster = function (monster, monster_id) {
    console.log(monster);
    CampaignService.deleteMonster(monster, monster.monster_id);
  }

  // ENCOUNTER: Get the encounterList variable
  self.encounterList = CampaignService.encounterList;

  // ENCOUNTER: CampaignSerivce to add a encounter
  self.addEncounter = function (encounter, campaign, character, monster) {
    console.log(encounter, campaign, character, monster);
    
    CampaignService.addEncounter(encounter, campaign, character, monster);
  }

  // ENCOUNTER: CampaignService to delete an encounter
  self.deleteEncounter = function (encounter, encounter_id) {
    CampaignService.deleteEncounter(encounter, encounter.encounter_id);
  }

}])