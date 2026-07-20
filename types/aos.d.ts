declare module "aos" {
  interface AosOptions {
    duration?: number;
    easing?: string;
    offset?: number;
    once?: boolean;
  }

  const AOS: {
    init(options?: AosOptions): void;
  };

  export default AOS;
}
