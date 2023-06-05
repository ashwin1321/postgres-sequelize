import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
  fastify.get("/login/github/callback", async function (request, reply) {
    const token =
      await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        request
      );
    console.log(token.token);

    request.session.user = token.token;
    const csrfToken = await reply.generateCsrf();
    reply.send(csrfToken);
  });
});
