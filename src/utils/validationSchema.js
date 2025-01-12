export const createUserValidataonSchema = {
    name: {
        isLength: {
            options: {
                min: 3,
                max: 32,
            },
            errorMessage: "Name must be between 3 and 32 characters",
        },
        notEmpty: {
            errorMessage: "Name is required",
        },
        isString: {
            errorMessage: "Name must be a string",
        },
    },
    displayName: {
        notEmpty: {
            errorMessage: "Display name is required",
        },
        isString: {
            errorMessage: "Display name must be a string",
        },
        isLength: {
            options: {
                min: 3,
                max: 10,
            },
            errorMessage: "Display name must be between 3 and 10 characters",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
        },
    },
};

export const getUserValidationSchema = {
    filter: {
        notEmpty: {
            errorMessage: "User Name is required",
        },
        isString: {
            errorMessage: "User Name must be a string",
        },
        isLength: {
            options: {
                min: 3,
                max: 10,
            },
            errorMessage: "User Name must be between 3 and 10 characters",
        },
    },
};
