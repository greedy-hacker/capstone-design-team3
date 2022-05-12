module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('Project', {
        projectName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            comment: "프로젝트 이름",
        },
        description: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: "프로젝트 설명",
        },
        target_domain: {
            type: Sequelize.STRING(200),
            allowNull: true,
            comment: "타겟 도메인",
        },
    }, {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Project.associate = db => {
        db.projects.hasMany(db.monitoringUrls,{foreignKey: "project_id"});
        db.projects.hasMany(db.monitoringResults,{foreignKey: "project_id"});

        db.projects.belongsTo(db.users, {foreignKey: "user_id"});
        db.projects.belongsToMany(db.keywords, {
            through: 'Add',
            foreignKey: "project_id",
            // sourceKey: "id"
        });
    };
    return Project;
};