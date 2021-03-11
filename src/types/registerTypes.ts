/**
 * Only return success and error string since website will redirect
 * users to login after the registration is complete
 */
export interface RegisterReturnPackage
{
	success: boolean,
	error: string
}
