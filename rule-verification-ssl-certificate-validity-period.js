// ----------------------------------------------------------------------------
// Verification rule for the validity period of an SSL certificate in Versio.io
// @author: matthias.scholze@versio.io
// ----------------------------------------------------------------------------

// Use the following constants for easier verification
const month = 2628000000;
const week  = 604800000;
const day   = 86400000;

// Calculate the remaining term
let validityPeriodMiiliseconds = DATASET.state.valid_to - (new Date()).getTime();

// Verify that the SSL certificate is only valid for one week => violation
if (validityPeriodMiiliseconds < month) {
  return({
    result: true, 
    shortDescription: "The validity period of SSL certificate '" +  DATASET.state.domain  + "' expires.", 
    description: "The validity period of SSL certificate '" +  DATASET.state.domain  + "' expires in " + (validityPeriodMiiliseconds/1000/60/60/24) + " days."
  });
}

// SSL certificate is valid for more than one week => no violation
return false;
