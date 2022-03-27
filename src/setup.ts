import Roles from './enums/roles.enums';
import Users from './models/users.models';

const SUPERADMIN = new Users({
	username: 'superadmin',
	email: 'superadmin@miapi.com',
	password: 'admin2022',
	role: Roles.SuperAdmin,
});

async function createSuperUser() {
	const verify = await Users.findOne({ email: SUPERADMIN.email });
	if (verify) return;
	SUPERADMIN.password = await SUPERADMIN.encryptPassword(SUPERADMIN.password);
	const created = await SUPERADMIN.save();
	console.log(`Super admin created ${created}`);
	return;
}

createSuperUser();
