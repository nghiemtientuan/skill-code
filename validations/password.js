const passwordValidatorRule = () => ({
    validator: async (rule, value = '') => {
        if (value && value.length > 0) {
            const result = value.match(
                /(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
            );
            if (result) return Promise.resolve();

            return Promise.reject(
                'The password is invalid',
            );
        }
    },
});

const confirmPasswordValidatorRule = ({ getFieldValue }, passwordField = 'password') => ({
    validator: async (_, value) => {
        if (getFieldValue(passwordField) === value) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('The confirm password is not match'));
    },
})

export {
    passwordValidatorRule,
    confirmPasswordValidatorRule
}
