const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm")

class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    name;

    @Column()
    password;
}

exports.module = User;