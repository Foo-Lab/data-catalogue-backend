
 /* nid to make the routes for each table after making the controller*/

 const User = require('./user.model.js');
 const Status = require('./status.model.js');
 const Organism = require('./organism.model.js');
 const Experiment = require('./experiment.model.js');
 const Sample = require('./sample.model.js');
 const SampleFile = require('./sampleFile.model.js');
 const FileType = require('./fileType.model.js');
 const SequencingProvider = require('./sequencingProvider.model.js');
 const Seqeuncer = require('./sequencer.model.js');
 const SequencingType = require('./sequencingType.model.js');

 // associations

Users








 Publication.belongsTo(Publisher, { foreignKey: 'publisher_id' })
 Publication.belongsToMany(Researcher, { through: ResearcherPublication, foreignKey: 'publication_id' });
 
 Publisher.hasMany(Publication, { foreignKey: 'publisher_id' });
 
 Researcher.belongsToMany(Publication, { through: ResearcherPublication, foreignKey: 'researcher_id' });
 
 ResearcherPublication.belongsTo(Researcher, { foreignKey: 'researcher_id' });
 ResearcherPublication.belongsTo(Publication, { foreignKey: 'publication_id' });
 
 module.exports = {
     Publication,
     Publisher,
     Researcher,
     ResearcherPublication
 };
 