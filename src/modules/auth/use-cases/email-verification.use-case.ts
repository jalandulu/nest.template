import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AuthService, IdentityService } from 'src/services';
import { FastifyRequest } from 'fastify';
import { SignedVerifyRequest } from '../requests';

@Injectable()
export class EmailVerificationUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly identityService: IdentityService,
  ) {}

  async sign(request: FastifyRequest, userId: string) {
    const isVerified = await this.identityService.isVerified(userId);
    if (isVerified) {
      throw new UnprocessableEntityException('email is already verified');
    }

    const origin = request.headers.origin;
    if (!origin) {
      throw new UnprocessableEntityException('undefined origin hostname');
    }

    const signatureUrl = this.authService.verifyEmailStrategy(
      `${origin}/verification-email/verify`,
      userId,
    );

    return signatureUrl;
  }

  async verify(request: FastifyRequest, payload: SignedVerifyRequest) {
    try {
      const origin = request.headers.origin;
      if (!origin) {
        throw new UnprocessableEntityException('undefined origin hostname');
      }

      const signatureUrl = new URL(`${origin}/verification-email/verify`);
      signatureUrl.searchParams.append('signed', payload.signed);
      signatureUrl.searchParams.append('token', payload.token);

      const { data } = this.authService.verifySignedUrl(signatureUrl.href);

      const isValidToken = await this.authService.emailVerificationToken(data);
      if (!isValidToken) {
        throw new UnprocessableEntityException('Request expired');
      }

      await Promise.all([
        this.authService.emailVerified(data),
        this.identityService.updateVerified(data),
      ]);

      return true;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}