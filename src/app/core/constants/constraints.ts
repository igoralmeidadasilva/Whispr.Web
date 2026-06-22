export class Constraints {
    public static User = class {
        public static readonly USER_NAME_MIN_LENGTH = 4;
        public static readonly USER_NAME_MAX_LENGTH = 20;
        public static readonly PASSWORD_MIN_LENGTH = 6;
        public static readonly PASSWORD_MAX_LENGTH = 64;
  };
}