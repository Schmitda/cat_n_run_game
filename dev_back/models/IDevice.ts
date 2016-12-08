import IUser = require("./IUser");
interface IDevice {
    name: string;
    _id: string;
    description:string;
    createdBy: IUser;
    createdAt: Date;
    activeFrom: Date;
    inactiveAt: Date[];
};

export = IDevice;


