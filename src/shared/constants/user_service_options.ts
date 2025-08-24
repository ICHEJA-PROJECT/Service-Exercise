export const USER_SERVICE_OPTIONS = {
    USER_SERVICE_NAME: 'USER_SERVICE',
    USER_QUEUE: 'USER_QUEUE',

    //! ---------------- Person controllers ----------------
    PERSON_CREATE: 'person.create',
    PERSON_FIND_ONE: 'person.findOne',

    //! ---------------- Road Type controllers ----------------
    ROAD_TYPE_FIND_ALL: 'roadType.findAll',

    //! ---------------- Settlement controllers ----------------
    SETTLEMENT_FIND_BY_ZIPCODE: 'settlement.findByZipcode',
    SETTLEMENT_FIND_BY_MUNICIPALITY_AND_TOWN: 'settlement.findByMunicipalityAndTown',

    //! ---------------- Municipality controllers ----------------
    MUNICIPALITY_FIND_BY_STATE: 'municipality.findByState',

    //! ---------------- Town controllers ----------------
    TOWN_FIND_BY_MUNICIPALITY: 'town.findByMunicipality',

    //! ---------------- Role controllers ----------------
    ROLE_CREATE: 'role.create',
    ROLE_FIND_ALL: 'role.findAll',

    //! ---------------- Role Person controllers ----------------
    ROLE_PERSON_CREATE: 'rolePerson.create',

    //! ---------------- Schedule controllers ----------------
    SCHEDULE_CREATE: 'schedule.create',
    SCHEDULE_FIND_ALL: 'schedule.findAll',

    //! ---------------- Schedule Person controllers ----------------
    SCHEDULE_PERSON_CREATE: 'schedulePerson.create',
    SCHEDULE_PERSON_FIND_BY_PERSON: 'schedulePerson.findByPerson',

    //! ---------------- Student controllers ---------------
    STUDENT_CREATE: 'student.create',
    STUDENT_FIND_BY_TEACHER: 'student.findByTeacher',
    STUDENT_FIND_BY_CURP: 'student.findByCurp',
    STUDENT_FIND_BY_NAME: 'student.findByName',
    STUDENT_FIND_BY_ID: 'student.findById',
    STUDENT_FIND_UNIQUE_NAMES: 'student.findUniqueNames',

    //! ---------------- Institution controllers ---------------
    INSTITUTION_CREATE: 'institution.create',
    INSTITUTION_FIND_ALL: 'isntitution.findAll',
    INSTITUTION_FIND_BY_ID: 'institution.findById',

    //! ---------------- Cell controllers ---------------
    CELL_CREATE: 'cell.create',
    CELL_FIND_ALL: 'cell.findAll',
    CELL_FIND_BY_INSTITUTION: 'cell.findByInstitution',
    CELL_FIND_BY_COORDINATOR: 'cell.findByCoordinator',
    CELL_FIND_ONE: 'cell.findOne',

    //! ---------------- Teacher Cell controllers ---------------
    TEACHER_CELL_CREATE: 'teacherCell.create',
};