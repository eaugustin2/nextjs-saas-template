interface MagicLinkProps {
  token: string
}

const MagicLink = ({ token }: MagicLinkProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-white">
      <h1 className="text-4xl font-bold">Verification Code</h1>
      <p>Please use the following code to verify your email:</p>
      <h2 className="text-2xl font-bold">{token}</h2>
      <p>This code will expire in 15 minutes.</p>
      <p>If you did not request this code, please ignore this email.</p>
      <p>Thank you!</p>
    </div>
  )
}

export default MagicLink
