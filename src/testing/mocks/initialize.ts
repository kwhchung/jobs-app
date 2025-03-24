import { IS_SERVER } from "@/config/constants";
import { seedDb } from "@/testing/mocks/seed-db";

const initializeMocks = async () => {
  if(IS_SERVER){
    const { server } = await import("@/testing/mocks/server");
    server.listen();
  }else{
    const { worker } = await import("@/testing/mocks/browser");
    worker.start();
  }
  seedDb();
};

initializeMocks();
