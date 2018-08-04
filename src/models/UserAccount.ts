export class UserAccount {
    constructor(
        public sUserID: string,//student code
        public sUserName: string,
        public sPassword: string,
        public sUserCode: string,//student code
        public sFullName: String,
        public sFirstName: String,
        public sLastName: String,
        public sSex: String,
        public cUserType: string,
        public sClassNo: string,
        public sEmail: string,
        public sTel: string,
        public sSysFileNameImage: string,
        public cStatus: string,
        public cStatusEducation: string,
        public cStatusEduated: string,
        public isEduated: boolean,
        public sPIN: string,
        //result
        public sResult: string,
        public sMsg1: string,
        public sMsg2: string,
        public sMsg3: string,
    ) { }
}