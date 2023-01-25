import openapiTS from "openapi-typescript";
import type { PageServerLoad } from "./$types";
import SwaggerParser from "@apidevtools/swagger-parser";

export const load: PageServerLoad = async ({}) => {
    let api = await SwaggerParser.parse("https://petstore.swagger.io/v2/swagger.json");
    // const api = await openapiTS("https://petstore.swagger.io/v2/swagger.json");
    return {api};
};