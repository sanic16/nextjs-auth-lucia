type SignUpErrors = {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
};

type SignInErrors = {
  email?: string;
  password?: string;
};

type PostErrors = {
  title?: string;
  category?: string;
  description?: string;
  thumbnail?: string;
};
