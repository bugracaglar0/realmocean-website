interface User {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
  }
  
  interface App {
    id: string;
    name: string;
    apiKey: string;
    description: string;
  }
  
  interface Trigger {
    id: string;
    appId: string;
    description: string;
    eventType: string;
  }
  
  interface Action {
    id: string;
    appId: string;
    description: string;
    actionType: string;
    configParameters: object;
  }
  
  interface Workflow {
    id: string;
    userId: string;
    triggerId: string;
    actionId: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Log {
    id: string;
    workflowId: string;
    timestamp: Date;
    outcome: string;
    details: string;
  }
  
  export { User, App, Trigger, Action, Workflow, Log };
  