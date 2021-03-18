/**
 * Function to dynamically generate build path with local or remote deployments
 */
export default function buildpath(route: string)
{
	if (process.env.NODE_ENV === "production")
	{
		// Insert remote base URI here

		// Project did not need to be hosted so there is no existing one
	}
	else
	{
		return "https://localhost:5000/" + route;
	}
}
