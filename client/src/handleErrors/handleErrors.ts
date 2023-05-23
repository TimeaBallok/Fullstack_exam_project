export default function handleErrors(error: any) {
    let errorMessage = 'An unexpected error occurred.';

    if (error.networkError) {
        console.log(`[Network error]: ${error.networkError}`);
        errorMessage = "Sorry, we're having some connection problems. Please try again later.";
    }

    if (error.graphQLErrors) {
        error.graphQLErrors.map(({ message, locations, path }: {
            message: string;
            locations?: string[];
            path?: string;
        }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            );
        });
        errorMessage = "Sorry, something went wrong. Please try again later.";
    }


    window.alert(errorMessage);
    return null;
}
