/* eslint-disable no-console*/
'use strict';

import User from './models/userModel';

import { SEEDER_USER } from './configs';

(async () => {
    res.send({status: "creating user"});

    let user = User.findOne({'email': SEEDER_USER.EMAIL});

    if (!user) {
        try {
            await User.create({
                'email': SEEDER_USER.EMAIL,
                'password': SEEDER_USER.PASSWORD,
                'accountType': userRoles.ADMIN
            });
            res.send({status: " seed user created"});
        } catch (e) {
            res.send({status: "seed user available"});
        }
    } else {
        res.send({status: "seed user available"});
    }
    
})();