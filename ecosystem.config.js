module.exports = {
  apps: [
    {
      name: "les-experts-admin-panel",
      script: "yarn",
      args: "start",
      interpreter: "/bin/bash",
      env: {
        NODE_ENV: "production",
      },
      exp_backoff_restart_delay: 100,
    },
  ],
};
