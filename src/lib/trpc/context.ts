import { db } from '@/lib/db/index';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */

  const session = {user: {
    id: 'user_123',
    name: 'John Doe',
    email: 'john.doe@example.com',
  }};
  return { db, session };
});

// export async function createTRPCContext(opts: {
//   headers: Headers;
//   authInfo?: { userId: string | null; sessionClaims: any };
// }) {

//   // Create session from extracted auth info
//   let session = null;

//   try {
//     // console.log('🔍 tRPC Context: Creating context with auth info:', {
//     //   hasAuthInfo: !!opts.authInfo,
//     //   hasUserId: !!opts.authInfo?.userId,
//     //   userId: opts.authInfo?.userId?.substring(0, 10) + '...' || 'null'
//     // });

//     if (opts.authInfo?.userId) {
//       const { userId, sessionClaims } = opts.authInfo;
//       session = {
//         user: {
//           id: userId,
//           name:
//             `${sessionClaims?.firstName || ''} ${sessionClaims?.lastName || ''}`.trim() ||
//             undefined,
//           email:
//             typeof sessionClaims?.email === 'string'
//               ? sessionClaims.email
//               : undefined,
//         },
//       };
//       // console.log(
//       //   '✅ tRPC Context: Session created for user',
//       //   userId.substring(0, 10) + '...',
//       // );
//     } else {
//       // console.log('❌ tRPC Context: No auth info provided, session is null');
//       // console.log('   - authInfo exists:', !!opts.authInfo);
//       // console.log('   - userId exists:', !!opts.authInfo?.userId);
//     }
//   } catch (error) {
//     // console.log('❌ Error creating session in tRPC context:', error);
//     session = null;
//   }

//   return {
//     db,
//     session: session,
//     headers: opts.headers,
//   };
// }

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;